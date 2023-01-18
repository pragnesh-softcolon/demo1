import fs from 'fs'

export const deleteFiles = async (medias) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      for (const mediaDelete of medias) {
        await fs.unlinkSync(mediaDelete.path)
      }
      return resolve(true)
    } catch (e) {
      return reject(e)
    }
  })
}

export const deleteMultipleFile = async (medias) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      for (let i = 0; i < medias.length; i++) {
        await fs.unlinkSync(medias[i].path)
      }
      return resolve(true)
    } catch (e) {
      return reject(e)
    }
  })
}
