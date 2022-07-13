type arrType = '10px' |  '11px' | '12px' | '13px' | '14px' | '16px' | '20px' | '24px' | '32px' | '36px' | '40px' | '64px' | '96px'

export const findClosest: ( val: number, arr: arrType[] ) => string = ( val, arr ) => {
    const numArr = arr.map( n => parseInt(n.replace( /px/gi, '' )) )
    if( numArr.includes( val ) ) return val + 'px'

    const newArr: number[] = []

    numArr.forEach( n => {
        n - val > 0 && newArr.push( n - val )  
    } )  

    const closest = Math.min( ...newArr )

    return (val - closest) + 'px'
}
