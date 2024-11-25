import fs from 'fs';
import csv from 'csv-parser';
import { parse } from 'path';

interface User {
  name: string;
  email: string;
}

interface parsedData {
  data: string
}

abstract class ETL {
  protected filepath: string;
  
  constructor(filepath: string) {
    this.filepath = filepath;
  }

  public async process(): Promise<void> {
    const data = await this.extract();
    const parsedData = this.transform(data);  
    this.load(parsedData);
  }

  protected abstract  extract(): Promise<User[]>;

  protected transform(data: User[]): parsedData[] {
    console.log('Transforming Data');
    
    return data.map(user => ({
      data: `name: ${user.name}, email: ${user.email}`,
    }));
  }
  
  protected load(data: parsedData[]): void {
    console.log('Loading Data');

    data.forEach((item) => {
      console.log(item.data);
    });
  }
}

class CsvETL extends ETL {
  protected async extract(): Promise<User[]> {
    console.log('Extracting CSV data');
    
    const csvData: User[] = await new Promise((resolve, reject) => {
      const results: User[] = [];

      fs.createReadStream(this.filepath)
      .pipe(csv())
      .on('data', (data) => {
        results.push(data)
      })
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error))
    });
    
    return csvData.map((item: any) => ({
      name: item.name,
      email: item.email,
    }));
  }
}

class JsonETL extends ETL {
  protected async extract(): Promise<User[]> {
    console.log('Extracting JSON data');

    const rawData = fs.readFileSync(this.filepath, 'utf-8');
    const jsonData = JSON.parse(rawData);
    
    return jsonData.map((item: any) => ({
      name: item.name,
      email: item.email,
    }));  
  }
}

const csvETL = new CsvETL(__dirname + '/data.csv');
csvETL.process();

const jsonETL = new JsonETL(__dirname + '/data.json');
jsonETL.process();