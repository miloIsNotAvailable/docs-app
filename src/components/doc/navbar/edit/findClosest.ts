type arrType = '10px' |  '11px' | '12px' | '13px' | '14px' | '16px' | '20px' | '24px' | '32px' | '36px' | '40px' | '64px' | '96px'

/**
 * 
 * @param val is passed in value
 * @param arr is the array with numbers
 * @returns a number that's in the array 
 * or a number that is the closest to it
 */
export const findClosest: ( val: number, arr: arrType[] ) => string = ( val, arr ) => {
    // change everything to int
    const numArr = arr.map( n => parseInt(n.replace( /px/gi, '' )) )
    // check if number is already inthe array
    if( numArr.includes( val ) ) return val + 'px'

    /**
     * map through every item in the array
     * then compare which number 
     * has the smallest difference
     * and return it
     */
    const newArr: number[] = []

    numArr.forEach( n => {
        n - val > 0 && newArr.push( n - val )  
    } )  

    const closest = Math.min( ...newArr )

    return (val - closest) + 'px'
}
