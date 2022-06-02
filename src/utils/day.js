import dayjs from 'dayjs'

class DayJS {
  /**
   * @param { 时间值 } value
   * @param { 时间格式 } valueFormat
   */
  format(value, valueFormat) {
    return dayjs(value).format(valueFormat)
  }

  /**
   * 加零
   * @param {数值} value
   */
  addZero(value) {
    return value >= 1 && value <= 9 ? `0${value}` : value
  }

  getTime() {
    const year = new Date().getFullYear()
    const month = new Date().getMonth() + 1
    const day = new Date().getDate()
    const date = {}
    // 日期格式：2022-05-16
    date.end = `${year}-${this.addZero(month)}-${this.addZero(day)}`
    return {
      year,
      month,
      day,
      date
    }
  }

  getFormatDate(year, month, day) {
    return `${year}-${this.addZero(month)}-${this.addZero(day)}`
  }

  // 获取近一周时间范围
  getAWeek() {
    const time = this.getTime()

    // 如果在当月7日之前
    if (time.day - 7 <= 0) {
      // 1周前所在月的总天数
      const startMonthDay = new Date(
        time.year,
        parseInt(time.month) - 1,
        0
      ).getDate()

      // 如果在当年的1月份
      time.date.start =
        time.month - 1 <= 0
          ? `${this.getFormatDate(time.year - 1, 12, 31 - 7 - time.day)}`
          : `${this.getFormatDate(
              time.year,
              time.month - 1,
              startMonthDay - (7 - time.day)
            )}`
    } else {
      time.date.start = `${this.getFormatDate(
        time.year,
        time.month,
        time.day - 7
      )}`
    }
    return time.date
  }

  // 获取近一个月时间范围
  getAMonth() {
    const time = this.getTime()

    // 当前月的总天数
    const endMonthDay = new Date(time.year, time.month, 0).getDate()

    // 如果是1月，年数往前推一年
    if (time.month - 1 <= 0) {
      time.date.start = `${this.getFormatDate(time.year - 1, 12, time.day)}`
    } else {
      // 上个月的总天数
      const startMonthDay = new Date(
        time.year,
        parseInt(time.month) - 1,
        0
      ).getDate()

      // 1个月前所在月的总天数小于现在的天日期
      if (startMonthDay < time.day) {
        // 当前天日期小于当前月总天数
        time.date.start =
          time.day < endMonthDay
            ? `${this.getFormatDate(
                time.year,
                time.month - 1,
                startMonthDay - (endMonthDay - time.day)
              )}`
            : `${this.getFormatDate(time.year, time.month - 1, startMonthDay)}`
      } else {
        time.date.start = `${this.getFormatDate(
          time.year,
          time.month - 1,
          time.day
        )}`
      }
    }
    return time.date
  }

  // 获取近三个月时间范围
  getThreeMonth() {
    const time = this.getTime()
    // 当前月的总天数
    const endMonthDay = new Date(time.year, time.month, 0).getDate()

    // 如果是1、2、3月，年数往前推一年
    if (time.month - 3 <= 0) {
      // 3个月前所在月的总天数
      const start3MonthDay = new Date(
        time.year - 1,
        12 - (3 - parseInt(time.month)),
        0
      ).getDate()

      // 3个月前所在月的总天数小于现在的天日期
      time.date.start =
        start3MonthDay < time.day
          ? `${this.getFormatDate(
              time.year - 1,
              12 - (3 - time.month),
              start3MonthDay
            )}`
          : `${this.getFormatDate(
              time.year - 1,
              12 - (3 - time.month),
              time.day
            )}`
    } else {
      // 3个月前所在月的总天数
      const start3MonthDays = new Date(
        time.year,
        parseInt(time.month) - 3,
        0
      ).getDate()

      //3个月前所在月的总天数小于现在的天日期
      if (start3MonthDays < time.day) {
        //当前天日期小于当前月总天数,2月份比较特殊的月份
        time.date.start =
          time.day < endMonthDay
            ? `${this.getFormatDate(
                time.year,
                time.month - 3,
                start3MonthDays - (endMonthDay - time.day)
              )}`
            : `${this.getFormatDate(
                time.year,
                time.month - 3,
                start3MonthDays
              )}`
      } else {
        time.date.start = `${this.getFormatDate(
          time.year,
          time.month - 3,
          time.day
        )}`
      }
    }
    return time.date
  }
}

export default new DayJS()
