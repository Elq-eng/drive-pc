import { useFecth } from "./useFecth"

export const useFiles = (url='') => {
  

  const dataResp = useFecth(url)
  console.log(dataResp)


  return {
    ...dataResp
  }
}
