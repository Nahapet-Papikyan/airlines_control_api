import { BadRequestException, ValidationError } from '@nestjs/common'


export const exceptionFactory = (validationErrors: ValidationError[] = []) => {
  const errors = {}
  validationErrors.forEach((error) => {
    errors[error.property] = Object.values(error.constraints)
  })
  return new BadRequestException(errors)
}
