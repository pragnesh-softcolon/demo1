
export const sendSuccess = (res, data, message) => {
  let Response
  if (Array.isArray(data)) {
    Response = {
      status: 200,
      data: {
        // count: data.length,
        row: data
      },
      message
    }
  } else {
    Response = { status: 200, data, message }
  }
  /* Send Back An HTTP Response */
  res.status(200).json(Response)
  res.end()
}

export const sendSuccessWithDate = (res, data, date = Date.now()) => {
  let Response
  if (Array.isArray(data)) {
    Response = {
      status: 200,
      data: {
        // count: data.length,
        row: data
      },
      date
    }
  } else {
    Response = { status: 200, data, date }
  }

  /* Send Back An HTTP Response */
  res.status(200).json(Response)
  res.end()
}

export const sendBadRequest = (res, messages, error = []) => {
  res.status(400).send({
    status: 400,
    message: messages,
    error
  })
}

export const sendError = (res, errors, message) => {
  res.status(400).send({
    message,
    status: 400,
    errors
  })
}
