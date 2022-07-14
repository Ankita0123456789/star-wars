import React from 'react'

import { populate } from "../../utils/default";

type Props = {}

const Legend = (props: Props) => {
  return (
    <>
    {/* <div className="container-fluid flex flex-row flex-wrap justify-center">
  
          return (
            <div
              className={`columns-1 w-8/12 md:w-5/12 lg:w-3/12 xl:w-3/12 border p-4 rounded m-5 text-center ${itemStyle.color}`}
              key={item.name}
            >
              <p className="text-xl pb-3 itemStyle.font">{item.name}</p>
              <p className="text-sm">Diameter - {item.diameter}</p>
              <p className="text-sm py-2">Temperature - {item.climate}</p>
              <p className="text-sm pb-2">Population - {item.population}</p>
            </div>
          );
      </div> */}
    <div className="container-fluid w-auto justify-center border p-3 m-3">
        <p className='text-center text-xl pb-4'>Details</p>
    {populate.map((item: any) => {
                return (
                        <ul className='ml-2' key={item.id}>
                        <p>
                        <span className={`${item.color} text-center px-5 border-current border mb-2`}></span>
                        <span className='px-10'>{item.population}</span>
                        </p>
                        {/* <li className={`${item.color} text-center p-2 mb-2`}></li> */}
                        </ul>
                );
              })}
   </div>  
   </>
  )
}

export default Legend