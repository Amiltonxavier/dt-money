
type ContentProps = {
    amount: string,
    signal?: string
    title: string
}

export function Content({ amount, signal, title }: ContentProps) {
  return (
    <>
        <span  className="mb-1 text-base font-semibold">{title}</span>
            <span className="overflow-auto">
              <h4 className="text-xl lg:text-3xl mt-2 sm:mt-4 text-gray-100  font-bold truncate">
                <span>{signal}</span>{amount}
              </h4>  
          </span>
    </>
  )
}
