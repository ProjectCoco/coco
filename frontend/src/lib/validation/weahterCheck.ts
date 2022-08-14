import { imgs } from '../../images/index';

export function weatherCheck(
  iconUrl: string | undefined,
  iconName: string | undefined
) {
  switch (iconName) {
    case '01d':
      return imgs.clearSun;
    case '01n':
      return imgs.clearMoon;
    case '02d':
      return imgs.clearSun;
    case '02n':
      return imgs.clearMoon;
    case '03d':
      return imgs.cloud;
    case '03n':
      return imgs.cloud;
    case '04d':
      return imgs.brokenCloud;
    case '04n':
      return imgs.brokenCloud;
    case '09d':
      return imgs.rain;
    case '09n':
      return imgs.rain;
    case '10d':
      return imgs.rain;
    case '10n':
      return imgs.rain;
    case '11d':
      return imgs.thunder;
    case '11n':
      return imgs.thunder;
    case '13d':
      return imgs.snow;
    case '13n':
      return imgs.snow;
    case '50d':
      return imgs.mist;
    case '50n':
      return imgs.mist;
  }
  return iconUrl;
}
