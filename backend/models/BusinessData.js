const mongoose = require("mongoose");
const { Schema } = mongoose;

const businessDataSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        datasetName: {
            type: String,
            default: "un-titled",
            trim: true
        },

        lineChartData: [
            {
                day: String,
                revenue: Number
            }
        ],

        // 📈 KPIs
        last7DaysKPIs: {
            totalRevenue: Number,
            totalCustomers: Number,
            avgOrderValue: Number,
            retentionRate: Number,
            revenueGrowth: Number
        },
        last30DaysKPIs: {
            totalRevenue: Number,
            totalCustomers: Number,
            avgOrderValue: Number,
            retentionRate: Number,
            revenueGrowth: Number
        },
        last365DaysKPIs: {
            totalRevenue: Number,
            totalCustomers: Number,
            avgOrderValue: Number,
            retentionRate: Number,
            revenueGrowth: Number
        },

        // 📊 Chart Data

        areaChart7DaysData: [{ name: String, uv: Number }],
        barChart7DaysData: [{ name: String, pv: Number }],
        pieChart7DaysData: [{ name: String, value: Number }],

        areaChart30DaysData: [{ name: String, uv: Number }],
        barChart30DaysData: [{ name: String, pv: Number }],
        pieChart30DaysData: [{ name: String, value: Number }],

        areaChart365DaysData: [{ name: String, uv: Number }],
        barChart365DaysData: [{ name: String, pv: Number }],
        pieChart365DaysData: [{ name: String, value: Number }],

        // 🤖 LLM Output
        LLMResult: {
            summary: String,

            insights: [
                {
                    title: String,
                    description: String
                }
            ],

            risk: [
                {
                    title: String,
                    description: String
                }
            ],

            aiRecommendation: [
                {
                    title: String,
                    description: String
                }
            ]
        }

    },
    { timestamps: true }
);

module.exports = mongoose.model("BusinessData", businessDataSchema);