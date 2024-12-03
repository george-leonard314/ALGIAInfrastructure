from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
import boto3
import pandas as pd
import io
import matplotlib.pyplot as plt
import requests

app = FastAPI()

S3_BUCKET = "algiayfdata"
AWS_REGION = "eu-central-1"
s3_client = boto3.client('s3')



@app.get("/list-files")
def list_files():
    """List all CSV files in the S3 bucket."""
    response = s3_client.list_objects_v2(Bucket=S3_BUCKET)
    if 'Contents' not in response:  # Check if there are any files
        return []

    # List all filenames that end with .csv
    csv_files = [
        obj['Key'] for obj in response['Contents']
        if obj['Key'].endswith('.csv')
    ]
    return csv_files


@app.get("/get-preview/{filename:path}")
def get_preview(filename: str):
    """Fetch the first 10 rows of the selected CSV file."""
    try:
        obj = s3_client.get_object(Bucket=S3_BUCKET, Key=filename)
        df = pd.read_csv(io.BytesIO(obj['Body'].read()))

        # Handle NaN or infinite values
        df = df.replace([float('inf'), float('-inf')], None)  # Replace infinite values
        df = df.fillna(value="N/A")  # Replace NaN values with a placeholder (e.g., "N/A")

        preview = df.head(10).to_dict(orient="records")
        return preview
    except Exception as e:
        return {"error": str(e)}



@app.get("/get-graph/{filename:path}")
def get_graph(filename: str):
    """Generate a graph for the selected CSV file."""
    try:
        obj = s3_client.get_object(Bucket=S3_BUCKET, Key=filename)
        df = pd.read_csv(io.BytesIO(obj['Body'].read()))

        # Generate graph
        plt.figure(figsize=(10, 6))
        df.plot(x='Date', y='Close', title=f"Stock Data for {filename}")
        img_io = io.BytesIO()
        plt.savefig(img_io, format='png')
        img_io.seek(0)

        return FileResponse(img_io, media_type="image/png", filename=f"{filename}.png")
    except Exception as e:
        return {"error": str(e)}


@app.post("/add-data")
def add_data(data: dict):
    # Log the incoming data for debugging
    print("Received data:", data)

    # Ensure all required fields are present
    required_fields = ["symbol", "start_date", "end_date", "s3_bucket", "s3_key", "event_type", "interval_value"]
    for field in required_fields:
        if field not in data:
            raise HTTPException(status_code=400, detail=f"Missing field: {field}")

    # API Gateway URL
    api_url = "https://ojy2dxkidf.execute-api.eu-central-1.amazonaws.com/Initial_stage/execution"

    # Forward the data to the API Gateway
    response = requests.post(api_url, json=data)

    # Log the API Gateway response for debugging
    print("API Gateway response:", response.text)

    # Return the response from the API Gateway
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.text)

    return response.json()