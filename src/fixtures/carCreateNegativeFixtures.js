export const carCreateNegativeFixtures = [
  {
    title: 'should return error message when mileage is missing',
    inputData: {
      carBrandId: 1,
      carModelId: 1,
    },
    expectedData: {
      statusCode: 400,
      data: { status: 'error', message: 'Mileage is required' },
    },
  },
  {
    title: 'should return error message when brandId is missing',
    inputData: {
      mileage: Math.floor(Math.random() * 100),
      carModelId: 1,
    },
    expectedData: {
      statusCode: 400,
      data: { status: 'error', message: 'Car brand id is required' },
    },
  },
  {
    title: 'should return error message when modelId is missing',
    inputData: {
      mileage: Math.floor(Math.random() * 100),
      carBrandId: 1,
    },
    expectedData: {
      statusCode: 400,
      data: { status: 'error', message: 'Car model id is required' },
    },
  },
  {
    title: 'should return error message when mileage is not a number',
    inputData: {
      mileage: 'test',
      carBrandId: 1,
      carModelId: 1,
    },
    expectedData: {
      statusCode: 400,
      data: { status: 'error', message: 'Invalid mileage type' },
    },
  },
  {
    title: 'should return error message when brandId is not a number',
    inputData: {
      mileage: Math.floor(Math.random() * 100),
      carBrandId: 'test',
      carModelId: 1,
    },
    expectedData: {
      statusCode: 400,
      data: { status: 'error', message: 'Invalid car brand type' },
    },
  },
];
