require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});


const generateIntellexaInsights = async (prompt) => {

  try {

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3,
      response_format: { type: "json_object" } 
    });

    const responseText =
      completion.choices[0].message.content;

    const parsedResponse = JSON.parse(responseText);

    return parsedResponse;

  } catch (error) {
    console.error("Groq LLM Error:", error);
    throw error;
  }
};

function groupDataByYearMonthDay(data) {

  const result = {};

  data.forEach((item) => {

    const dateObj = new Date(item.date);

    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");

    if (!result[year]) {
      result[year] = {};
    }

    if (!result[year][month]) {
      result[year][month] = {};
    }

    result[year][month][day] = {
      ...item,
      total_customers: Number(item.total_customers),
      avg_order_value: Number(item.avg_order_value),
      returning_customers: Number(item.returning_customers),
      new_customers: Number(item.new_customers),
      marketing_spend: Number(item.marketing_spend),
      daily_revenue: Number(item.daily_revenue),
    };

  });

  return result;
}

function extractModelFeatures(data) {

  return data.map(row => {

    const d = new Date(row.date);

    return {

      year: d.getFullYear(),
      month: d.getMonth() + 1,
      day: d.getDate(),
      day_of_week: d.getDay(),
      is_weekend:
        d.getDay() === 0 || d.getDay() === 6 ? 1 : 0,

      total_customers: Number(row.total_customers),
      avg_order_value: Number(row.avg_order_value),
      returning_customers: Number(row.returning_customers),
      new_customers: Number(row.new_customers),
      marketing_spend: Number(row.marketing_spend),

      daily_revenue: Number(row.daily_revenue)
    };

  });

}

const formatPredictedDailyRevenue = (predictionResponse) => {

  if (
    !predictionResponse ||
    !predictionResponse.predictions
  ) {
    return [];
  }

  const predictions = predictionResponse.predictions;

  const sortedPredictions = predictions.sort(
    (a, b) => a.day - b.day
  );

  const lineChartData = sortedPredictions.map(item => ({
    day: String(item.day), 
    revenue: Number(
      item.predicted_revenue.toFixed(2)
    )
  }));

  return lineChartData;
};

const calculateKPIs = (data, days) => {

  if (!data || data.length === 0) {
    return null;
  }

  // ---------------- SORT DATA ----------------
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const today = new Date(sortedData.at(-1).date);

  // ---------------- CURRENT PERIOD ----------------
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - days);

  const currentPeriod = sortedData.filter(item =>
    new Date(item.date) >= startDate
  );

  // ---------------- PREVIOUS PERIOD ----------------
  const prevStartDate = new Date(startDate);
  prevStartDate.setDate(startDate.getDate() - days);

  const previousPeriod = sortedData.filter(item => {
    const d = new Date(item.date);
    return d >= prevStartDate && d < startDate;
  });

  // ---------------- KPI CALCULATIONS ----------------
  const sum = (arr, key) =>
    arr.reduce(
      (acc, item) => acc + Number(item[key] || 0),
      0
    );

  const totalRevenue = sum(currentPeriod, "daily_revenue");

  const totalCustomers = sum(
    currentPeriod,
    "total_customers"
  );

  const returningCustomers = sum(
    currentPeriod,
    "returning_customers"
  );

  const avgOrderValue =
    totalCustomers > 0
      ? totalRevenue / totalCustomers
      : 0;

  const prevRevenue = sum(
    previousPeriod,
    "daily_revenue"
  );

  const revenueGrowth =
    prevRevenue > 0
      ? ((totalRevenue - prevRevenue) /
        prevRevenue) *
      100
      : 0;

  const retentionRate =
    totalCustomers > 0
      ? (returningCustomers /
        totalCustomers) *
      100
      : 0;

  // ---------------- RETURN KPIs ----------------
  return {
    totalRevenue: Number(totalRevenue.toFixed(2)),
    totalCustomers,
    avgOrderValue: Number(avgOrderValue.toFixed(2)),
    retentionRate: Number(retentionRate.toFixed(2)),
    revenueGrowth: Number(revenueGrowth.toFixed(2))
  };
};


const filterByDays = (data, days) => {

  const sorted = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const lastDate = new Date(sorted.at(-1).date);

  const startDate = new Date(lastDate);
  startDate.setDate(lastDate.getDate() - days);

  return sorted.filter(
    item => new Date(item.date) >= startDate
  );
};

const getLineChartData = (data, days) => {

  const filtered = filterByDays(data, days);

  // YEAR VIEW → Monthly aggregation
  if (days === 365) {

    const monthly = {};

    filtered.forEach(item => {

      const month = new Date(item.date)
        .toLocaleString("default", { month: "short" });

      monthly[month] =
        (monthly[month] || 0) +
        Number(item.daily_revenue);
    });

    return Object.entries(monthly).map(
      ([month, revenue]) => ({
        name: month,
        uv: revenue
      })
    );
  }

  // 7 / 30 DAYS → Relative timeline
  return filtered.map((item, index) => ({
    name: String(index + 1),   // ⭐ FIXED
    uv: Number(item.daily_revenue)
  }));
};

const getBarChartData = (data, days) => {

  const filtered = filterByDays(data, days);

  if (days === 365) {

    const monthlyCustomers = {};

    filtered.forEach(item => {

      const month = new Date(item.date)
        .toLocaleString("default", { month: "short" });

      monthlyCustomers[month] =
        (monthlyCustomers[month] || 0) +
        Number(item.total_customers);
    });

    return Object.entries(monthlyCustomers).map(
      ([month, customers]) => ({
        name: month,
        pv: customers
      })
    );
  }

  return filtered.map((item, index) => ({
    name: String(index + 1),   // ⭐ FIXED
    pv: Number(item.total_customers)
  }));
};

const getPieChartData = (data, days) => {

  const filtered = filterByDays(data, days);

  let returning = 0;
  let newCustomers = 0;

  filtered.forEach(item => {
    returning += Number(
      item.returning_customers || 0
    );

    newCustomers += Number(
      item.new_customers || 0
    );
  });

  return [
    { name: "Returning Customers", value: returning },
    { name: "New Customers", value: newCustomers }
  ];
};

const prepareLLMInput = (finalData) => {

  const {
    last7DaysKPIs,
    last30DaysKPIs,
    last365DaysKPIs,
    lineChartData
  } = finalData;

  // Prediction Summary

  const predictedRevenues =
    lineChartData.map(d => d.revenue);

  const avgPredictedRevenue =
    predictedRevenues.reduce((a, b) => a + b, 0)
    / predictedRevenues.length;

  const maxRevenue =
    Math.max(...predictedRevenues);

  const minRevenue =
    Math.min(...predictedRevenues);


  // Growth Analysis

  const revenueTrend =
    last30DaysKPIs.revenueGrowth > 0
      ? "growing"
      : "declining";

  const yearlyTrend =
    last365DaysKPIs.revenueGrowth > 0
      ? "positive"
      : "negative";


  //      Customer Behaviour

  const retention =
    last30DaysKPIs.retentionRate;

  let retentionStatus = "stable";

  if (retention < 50)
    retentionStatus = "low";
  else if (retention > 70)
    retentionStatus = "strong";

   //     FINAL LLM SAFE OBJECT

  const dataForLLM = {

    revenue_performance: {
      last_7_days: last7DaysKPIs.totalRevenue,
      last_30_days: last30DaysKPIs.totalRevenue,
      last_365_days: last365DaysKPIs.totalRevenue,
      monthly_growth_percent:
        last30DaysKPIs.revenueGrowth,
      yearly_growth_percent:
        last365DaysKPIs.revenueGrowth,
      trend: revenueTrend,
      yearly_trend: yearlyTrend
    },

    customer_metrics: {
      total_customers_30_days:
        last30DaysKPIs.totalCustomers,
      retention_rate: retention,
      retention_status: retentionStatus,
      avg_order_value:
        last30DaysKPIs.avgOrderValue
    },

    revenue_prediction: {
      next_month_avg_daily_revenue:
        Number(avgPredictedRevenue.toFixed(2)),
      highest_expected_day:
        Number(maxRevenue.toFixed(2)),
      lowest_expected_day:
        Number(minRevenue.toFixed(2))
    }
  };

  //        LLM PROMPT

  const prompt = `
You are an expert AI Business Analyst working for Intellexa.

Analyze the provided business performance summary.

Generate:

1. Critical Alerts (business risks or warnings)
2. Key Insights (important patterns or observations)
3. Actionable Decisions (steps business owner should take)

Rules:
- Focus on business meaning, not raw numbers
- Write for non-technical business owners
- Be practical and realistic
- Maximum 5 alerts
- Maximum 5 insights
- Maximum 5 decisions
- Avoid technical jargon
`;

  return dataForLLM;
};

const buildIntellexaPrompt = (dataForLLM) => {

  return `
  You are an AI Business Analyst inside Intellexa.
  
  Analyze the following business performance summary and generate business intelligence for non-technical users.
  
  BUSINESS DATA:
  ${JSON.stringify(dataForLLM)}
  
  TASK:
  1. Write an executive business summary.
  2. Detect business risks.
  3. Provide key insights.
  4. Suggest actionable AI recommendations to improve business performance.
  
  OUTPUT RULES:
  - Return ONLY valid JSON
  - No explanations or extra text
  - Use simple business language
  - Base analysis only on given data
  
  RETURN FORMAT:
  
  {
    "summary": "",
    "insights": [
      { "title": "", "description": "" }
    ],
    "risk": [
      { "title": "", "description": "" }
    ],
    "aiRecommendation": [
      { "title": "", "description": "" }
    ]
  }
  
  CONSTRAINTS:
  - Summary: 120–150 words
  - Exactly 5 insights
  - Exactly 5 risks
  - Exactly 5 AI recommendations
  - Titles short and clear
  `;
};

const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

const protect = async (req, res, next) => {
  try {

    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. No token."
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found"
      });
    }

    // Attach user to request
    req.user = user;

    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
};

const askBusinessAI = async (summary, question) => {
  try {

    const prompt = `
You are a business analytics AI assistant.

You will receive:
1. Business data summary
2. User question

Use the summary to answer the question.

Return ONLY valid JSON in this format:

{
 "answer": "clear business answer"
}

Business Data Summary:
${summary}

User Question:
${question}
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3
    });

    const response = completion.choices[0].message.content;

    try {
      return JSON.parse(response);
    } catch {
      return { answer: response };
    }

  } catch (error) {
    console.error(error);

    return {
      answer: "Sorry, AI could not process the request."
    };
  }
};


module.exports = {
  groupDataByYearMonthDay,
  extractModelFeatures, formatPredictedDailyRevenue,
  calculateKPIs,
  getLineChartData, getBarChartData,
  getPieChartData, prepareLLMInput, buildIntellexaPrompt,
  generateIntellexaInsights, generateToken, protect,askBusinessAI
} 