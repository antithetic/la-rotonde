const YEAR_SELECTOR = '[data-current-year]'

export function getCurrentYear(): number {
  return new Date().getFullYear()
}

export function printCurrentYear(root: ParentNode = document): void {
  const year = String(getCurrentYear())

  root.querySelectorAll(YEAR_SELECTOR).forEach((element) => {
    element.textContent = year

    if (element instanceof HTMLTimeElement) {
      element.dateTime = year
    }
  })
}
