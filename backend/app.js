require("dotenv").config();
const express = require("express");
const app = express();
const multer = require("multer");
const XLSX = require("xlsx");
const csv = require("csv-parser");
const { Readable } = require("stream");
const { groupDataByYearMonthDay, extractModelFeatures, formatPredictedDailyRevenue, calculateKPIs, getLineChartData, getBarChartData, getPieChartData, prepareLLMInput, buildIntellexaPrompt, generateIntellexaInsights, protect, askBusinessAI } = require("./uitls/methods");
const axios = require("axios");
const mongoose = require('mongoose');
const usersRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const BusinessData = require("./models/BusinessData");
const AiAssistant = require("./models/AiAssistant");

async function main() {
  await mongoose.connect(process.env.DB_URL);
}


main().then(()=>{
  console.log("Successfully Connected to INTELLEXA Database......");
})
.catch(err => console.log(err));


const PORT = process.env.PORT;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const storage = multer.memoryStorage(); // stores file in RAM
const upload = multer({ storage });
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTED_URL, // React frontend URL
    credentials: true
  })
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use('/users', usersRoutes);
app.use('/auth', authRoutes);

// Routes
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.post("/data", upload.single("file"),protect,async (req, res, next) => {
 
  try {

    // ✅ Check upload first
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const fileType =
      req.file.originalname.split(".").pop().toLowerCase();

    let jsonData = [];

    // =========================
    // ✅ EXCEL FILE
    // =========================
    if (fileType === "xlsx" || fileType === "xls") {
      let finalData = {};

      const workbook = XLSX.read(req.file.buffer, {
        type: "buffer",
      });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      jsonData = XLSX.utils.sheet_to_json(sheet);
      let processedData = groupDataByYearMonthDay(jsonData);
      const mlReadyData = extractModelFeatures(jsonData);
      console.log("ml ready data : " + mlReadyData)
      const response = await axios.post(
        `${process.env.ML_SERVICE_URL}/predict`,
        mlReadyData
      );

      const lineChartData =
        formatPredictedDailyRevenue(response.data);
      finalData["lineChartData"] = lineChartData;
      const last7DaysKPIs = calculateKPIs(
        jsonData,
        7
      );
      finalData["last7DaysKPIs"] = last7DaysKPIs;
      const last30DaysKPIs = calculateKPIs(
        jsonData,
        30
      );
      finalData["last30DaysKPIs"] = last30DaysKPIs;
      const last365DaysKPIs = calculateKPIs(
        jsonData,
        365
      );
      finalData["last365DaysKPIs"] = last365DaysKPIs;
      console.log(finalData)

      return res.json({
        message: "Excel parsed successfully",
        rows: jsonData.length,
        data: jsonData,
      });
    }

    // =========================
    // ✅ CSV FILE
    // =========================
    else if (fileType === "csv") {
      let finalData = {};

      const results = [];

      await new Promise((resolve, reject) => {

        Readable.from(req.file.buffer.toString())
          .pipe(csv())
          .on("data", (data) => results.push(data))
          .on("end", resolve)
          .on("error", reject);
      });

      jsonData = results;
      let processedData = groupDataByYearMonthDay(jsonData);
      const mlReadyData = extractModelFeatures(jsonData);
      const response = await axios.post(
        `${process.env.ML_SERVICE_URL}/predict`,
        mlReadyData
      );

      const lineChartData =
        formatPredictedDailyRevenue(response.data);
      finalData["lineChartData"] = lineChartData;

      const last7DaysKPIs = calculateKPIs(
        jsonData,
        7
      );
      finalData["last7DaysKPIs"] = last7DaysKPIs;
      const last30DaysKPIs = calculateKPIs(
        jsonData,
        30
      );
      finalData["last30DaysKPIs"] = last30DaysKPIs;
      const last365DaysKPIs = calculateKPIs(
        jsonData,
        365
      );
      finalData["last365DaysKPIs"] = last365DaysKPIs;

      const areaChart7DaysData =
        getLineChartData(jsonData, 7);
        finalData["areaChart7DaysData"] =areaChart7DaysData;

      const barChart7DaysData =
        getBarChartData(jsonData, 7);
        finalData["barChart7DaysData"] =barChart7DaysData;

      const pieChart7DaysData =
        getPieChartData(jsonData, 7);
        finalData["pieChart7DaysData"] =pieChart7DaysData;

        const areaChart30DaysData =
        getLineChartData(jsonData, 30);
        finalData["areaChart30DaysData"] =areaChart30DaysData;

      const barChart30DaysData =
        getBarChartData(jsonData, 30);
        finalData["barChart30DaysData"] =barChart30DaysData;

      const pieChart30DaysData =
        getPieChartData(jsonData, 30);
        finalData["pieChart30DaysData"] =pieChart30DaysData;

        const areaChart365DaysData =
        getLineChartData(jsonData, 365);
        finalData["areaChart365DaysData"] =areaChart365DaysData;

      const barChart365DaysData =
        getBarChartData(jsonData, 365);
        finalData["barChart365DaysData"] =barChart365DaysData;

      const pieChart365DaysData =
        getPieChartData(jsonData, 365);
        finalData["pieChart365DaysData"] =pieChart365DaysData;

      const dataForLLM = prepareLLMInput(finalData);
      const llmPrompt = buildIntellexaPrompt(dataForLLM);
      const LLMResult = await generateIntellexaInsights(llmPrompt);
      finalData["LLMResult"] = LLMResult;
      finalData["userId"] = req.user._id;

      let businessData = await BusinessData.create(finalData);

      return res.json({
        success:true,
        message:"User data analyzed successfully!"
      });
    }

    // =========================
    // ❌ Unsupported
    // =========================
    else {
      return res.status(400).json({
        success:false,
        message:"Unsupported File Format!"
      });
    }

  } catch (error) {
    return res.status(400).json({
      success:false,
      message:error
    });
  }
});

// ✅ GET ALL BUSINESS DATA
app.get("/businessData", protect, async (req, res) => {
  try {

    const data = await BusinessData
      .find({ userId: req.user._id }) // only logged user
      .sort({ createdAt: -1 }); // latest first

    return res.json({
      success: true,
      data
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error
    });
  }
});

app.post("/aiAssitant",protect,async (req,res,next)=>{ // implement aiAsistance in fronted as well as in backend 
  try {
    const {summary,question,businessDataId} = req.body;
    const userId = req.user._id;
    const aiAnswer = await askBusinessAI(summary,question);

    await AiAssistant.create({
      role:"user",
      userId,
      businessDataId,
      message:question
    })

    await AiAssistant.create({
      role:"ai",
      userId,
      businessDataId,
      message:aiAnswer.answer
    })

    res.json({success:true,data:aiAnswer});
  } catch (error) {
    console.log(error);
    res.json({success:false,data:error});
  }
})

app.get("/chats/:businessDataId",protect,async(req,res,next)=>{
  try {
    const {businessDataId} = req.params;
    const userId = req.user._id;

    const messages = await AiAssistant.find({
      userId,
      businessDataId
    }).sort({ createdAt: 1 });

    res.json({success:false,data:messages});
  } catch (error) {
    console.log(error);
    res.json({success:false,data:error});
  }
})

app.patch("/businessData/name",protect,async(req,res,next)=>{
try {
  const {businessDataId,newName} = req.body;
  await BusinessData.findByIdAndUpdate(businessDataId,{datasetName:newName})
  res.json({success:true,data:"dataset name has been updated successfully!"});
} catch (error) {
  console.log(error);
  res.json({success:false,data:error});
}
})

app.delete("/businessData/:id",protect,async(req,res,next)=>{
  try {
    await BusinessData.findByIdAndDelete(req.params.id);
    res.json({success:true,data:"dataset has been deleted successfully!"});
  } catch (error) {
    console.log(error);
    res.json({success:false,data:error});
  }
  })

app.use((err, req, res, next) => {
  try {
    res.json({ error: err });
  } catch (error) {
    res.json({ error: error });
  }
})