class Methods {
    getSavedListInLocalStorage() {
      let localList = JSON.parse(localStorage.getItem("list"));
      if (localList == null) {
        localList = [];
      }
      this.sortByTimestampOlderFirst(localList);
  
      return localList;
    }
  
    sortByTimestampOlderFirst(list) {
      return list.sort((a, b) => a.timestamp - b.timestamp);
    }
  
    getOnlyAcquiredItems(list) {
      return list.filter(function (i) {
        return i.acquired === true;
      });
    }
  
    saveListToLocalSorage(list) {
      localStorage.setItem("list", JSON.stringify(list));
    }
  }
  
  export default new Methods();