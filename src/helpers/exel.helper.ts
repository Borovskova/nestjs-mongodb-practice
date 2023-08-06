import * as reader from 'xlsx';


export const createExcelFileResponse = (
    fileName: string,
    bufferLength: number,
  ) => {
    return {
      'Content-Type': 'application/vnd.ms-excel',
      'Content-Disposition': `attachment; filename=${fileName}.xlsx`,
      'Content-Length': bufferLength,
      'Access-Control-Expose-Headers': 'Content-Disposition',
  
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
      Expires: 0,
    };
  };

  export const createExcelFileInBuffer = (worksheet): Buffer => {
    const workBook = reader.utils.book_new();
    reader.utils.book_append_sheet(workBook, worksheet, 'response');
    return reader.write(workBook, { type: 'buffer' });
  };