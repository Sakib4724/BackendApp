//Wrapper function / Utility Function (using try-catch)  ****Production Grade Practice****

// const asyncHandler = (fn) => async (req, res, next) => {
//   try {
//     await fn(req, res, next);

//   } catch (error) {
//     res.status(err.code || 500).json({
//         success: false,
//         message: err.message
//     });
//   }
// };

// export {asyncHandler};


//Wrapper function / Utility Function (using Promises)  ****Production Grade Practice****
const asyncHandler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
        .catch((err) =>  next(err))
    }
}

export {asyncHandler};