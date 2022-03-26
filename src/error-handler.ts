export const errorHandler = (error: unknown) => {
  if (Array.isArray(error)) {
    error.forEach(e => console.log(`Error: ${e.message}`));
  } else if (error instanceof Error) {
    console.log(`Error: ${error.message}`);
  } else {
    console.log(error);
  }
}
