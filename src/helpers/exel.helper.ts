import * as ExcelJS from 'exceljs';
import * as XLSX from 'xlsx';

export const createExcelFileResponse = (
  fileName: string,
  bufferLength: number,
) => {
  return {
    'Content-Type':
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'Content-Disposition': `attachment; filename=${fileName}.xlsx`,
    'Content-Length': bufferLength,
    'Access-Control-Expose-Headers': 'Content-Disposition',

    'Cache-Control': 'no-cache, no-store, must-revalidate',
    Pragma: 'no-cache',
    Expires: 0,
  };
};

export const generateExcel = async (
  data: any[],
): Promise<Buffer | any> => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sheet 1');
  const headers: Array<string> = [];

  for (const key in data[0]) {
    if (
      key.indexOf('$') === -1 &&
      (typeof data[0][key] === 'string' ||
        key.indexOf('tedAt') !== -1)
    )
      headers.push(key);
  }

  // Add headers
  worksheet.addRow(headers);

  //set column width
  worksheet.columns.forEach((column) => (column.width = 35));

  // Add data rows
  data.forEach((item) => {
    const row = [];
    headers.forEach((header) => row.push(item[header]));
    worksheet.addRow(row);
  });

  // Save the workbook to a buffer
  const buffer = await workbook.xlsx.writeBuffer();

  return buffer;
};

export const readExcel = async (
  fileBuffer: Buffer,
): Promise<any[]> => {
  const workbook = XLSX.read(fileBuffer, {
    type: 'buffer',
  });
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];

  // Convert worksheet data to JSON
  const data = XLSX.utils.sheet_to_json(worksheet);

  return data;
};
