const API_BASE_URL = "https://api.weekday.technology/adhoc/getSampleJdJSON";

export interface Job {
  jdUid: string;
  jdLink: string;
  companyName: string;
  location: string;
  jobRole: string;
  jobDetailsFromCompany: string;
  logoUrl: string;
  maxExp: number;
  maxJdSalary: number;
  minExp: number;
  minJdSalary: number;
  salaryCurrencyCode: string;
}

export async function fetchJobs(limit: number, offset: number): Promise<{ jobs: Job[], totalCount: number }> {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      "limit": limit,
      "offset": offset
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body
    };

    const response = await fetch(API_BASE_URL, requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.text();
    // console.log(result);
    const data = JSON.parse(result);
    // console.log(data);
    return {
      jobs: data.jdList,
      totalCount: data.totalCount
    };
  } catch (error) {
    throw new Error("Failed to fetch jobs");
  }
}
