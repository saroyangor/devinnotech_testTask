export enum Systems {
  CELSIUS = 'celsius',
  FAHRENHEIT = 'fahrenheit'
}

export function getTemperature(temp: number, system: Systems = Systems.CELSIUS): string {
  let res = ''
  if (system === Systems.CELSIUS) {
    res = (temp - 273.15).toFixed(0) + ' °C'
  } else if (system === Systems.FAHRENHEIT) {
    res = ((temp - 273.15) * 9 / 5 + 32).toFixed(0) + ' °F'
  }

  return res
}
