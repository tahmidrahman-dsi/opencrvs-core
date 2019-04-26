import * as Hapi from 'hapi'
import { regByAge, regWithin45d, fetchKeyFigures } from './metricsGenerator'
import { logger } from 'src/logger'
import { internal } from 'boom'
import { TIME_FROM, TIME_TO, LOCATION_ID } from './constants'
import { IAuthHeader } from '..'

export async function metricsHandler(
  request: Hapi.Request,
  h: Hapi.ResponseToolkit
) {
  try {
    const timeStart = request.query[TIME_FROM] + '000000'
    const timeEnd = request.query[TIME_TO] + '000000'
    const locationId = 'Location/' + request.query[LOCATION_ID]
    const authHeader: IAuthHeader = {
      Authorization: request.headers.authorization
    }

    return {
      keyFigures: await fetchKeyFigures(
        timeStart,
        timeEnd,
        locationId,
        authHeader
      ),
      regByAge: await regByAge(timeStart, timeEnd),
      regWithin45d: await regWithin45d(timeStart, timeEnd)
    }
  } catch (error) {
    logger.error(`Metrics:metricsHandler: error: ${error}`)
    return internal(error)
  }
}
