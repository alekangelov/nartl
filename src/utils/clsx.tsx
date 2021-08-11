export const clsx = (
  ...args: Array<string | undefined | number | null | boolean>
) => args.filter(Boolean).join(" ");
