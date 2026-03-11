import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from datetime import datetime, timedelta


def predict_future(data):

    df = pd.DataFrame(data)

    X = df[
        [
            "year",
            "month",
            "day",
            "day_of_week",
            "is_weekend",
            "total_customers",
            "avg_order_value",
            "marketing_spend"
        ]
    ]

    y = df["daily_revenue"]

    model = LinearRegression()
    model.fit(X, y)

    # last available date
    last_row = df.iloc[-1]
    last_date = datetime(
        int(last_row.year),
        int(last_row.month),
        int(last_row.day)
    )

    future_data = []

    for i in range(1, 31):

        future_date = last_date + timedelta(days=i)

        future_data.append({
            "year": future_date.year,
            "month": future_date.month,
            "day": future_date.day,
            "day_of_week": future_date.weekday(),
            "is_weekend": 1 if future_date.weekday() >= 5 else 0,
            "total_customers": df["total_customers"].mean(),
            "avg_order_value": df["avg_order_value"].mean(),
            "marketing_spend": df["marketing_spend"].mean()
        })

    future_df = pd.DataFrame(future_data)

    preds = model.predict(future_df)

    future_df["predicted_revenue"] = preds

    return future_df.to_dict(orient="records")