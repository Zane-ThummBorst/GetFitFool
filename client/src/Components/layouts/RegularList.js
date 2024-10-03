import React from 'react'
const RegularList = React.memo(({items, resourceName, itemComponent: ItemComponent}) => {
    return (
        <>
        {items.map( (item, i) =>(
           <ItemComponent key={crypto.randomUUID()} item ={item}/>))}
        </>
    )
})

export default RegularList;