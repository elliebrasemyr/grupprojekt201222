class Questions {
     static async getQuestions() {
      const url = "https://opentdb.com/api.php?amount=5&type=multiple";
      const devurl = "data.json"

      const response = await fetch(devurl);
      const responseData = await response.json();
      return responseData;
  }
}

export default Questions;