import json
import boto3
import yfinance as yf
import pandas as pd
from io import StringIO

s3_client = boto3.client('s3')

def lambda_handler(event, context):
    try:
        ticker = event['ticker']
        start_date = event['start_date']
        end_date = event['end_date']
        bucket_name = event['bucket_name']
        file_name = event['file_name']
    except KeyError as e:
        return {
            "statusCode": 400,
            "body": f"Missing required parameter: {str(e)}"
        }

    try:
        stock_data = yf.download(ticker, start=start_date, end=end_date)

        if stock_data.empty:
            return {
                "statusCode": 404,
                "body": f"No data found for ticker {ticker} between {start_date} and {end_date}."
            }

        csv_buffer = StringIO()
        stock_data.to_csv(csv_buffer)

        s3_client.put_object(
            Bucket=bucket_name,
            Key=file_name,
            Body=csv_buffer.getvalue()
        )

        return {
            "statusCode": 200,
            "body": f"Successfully uploaded {file_name} to S3 bucket {bucket_name}."
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "body": f"An error occurred: {str(e)}"
        }
