function pluralize(
  count: number,
  singular: string,
  plural: string = singular + "s"
): string {
  return count < 2 ? singular : plural;
}

export default pluralize;
