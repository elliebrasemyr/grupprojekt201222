/* ------------- schwartzian transform of bubble sort algorithm ------------- */

class RandomizeQuestions {
    static getRandomizedArray(array) {
        let randomizedArray = array

            // the first step is to convert each item in the array to an object that
            // holds {sort: a random value, value: the original item}
            .map((a) => ({sort: Math.random(), value: a}))

            // we then compare each object using its random key (a.sort, b.sort)
            // by using the function a.sort - b.sort we can get 3 different outcomes:

            // a is greater than b, so (a - b) will be a positive value
            //// outcome: b will be sorted with a lower index than a

            // b is greater than a, so (a - b) will be a negative value
            //// outcome: a will be sorted with a lower index than b

            // a is equal to b, so (a - b) will be 0
            //// outcome: a and b remain unchanged
            .sort((a, b) => a.sort - b.sort)

            // finally we reverse the first .map by setting a to the object value
            // like we're "unmapping" the initial .map
            .map((a) => a.value)
        return randomizedArray;
    }
}

export default RandomizeQuestions