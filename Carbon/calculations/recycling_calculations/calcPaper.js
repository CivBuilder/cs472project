/*
    Parameters:
    amount = number of pounds of Paper recycled

    Return:
    C02 in pounds saved by recycling Paper
*/
const calcPaper = (amount) => {
    return Math.round(4.40925 * amount);
    //source https://www.epa.gov/facts-and-figures-about-materials-waste-and-recycling/paper-and-paperboard-material-specific-data
}

export default calcPaper;