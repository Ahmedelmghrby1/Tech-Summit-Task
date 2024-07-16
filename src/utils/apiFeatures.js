

export class ApiFeatures{
    constructor(mongooseQuery, searchQuert){
        this.mongooseQuery = mongooseQuery
        this.searchQuert = searchQuert
    }
    pagination(){
        let pageNumber = this.searchQuert.page * 1 || 1
        if(this.searchQuert.page < 0) pageNumber = 1

        const limit = 2;
        let skip = (pageNumber - 1) * limit;
        this.pageNumber = pageNumber
        this.mongooseQuery.skip(skip).limit(limit)
        return this
    }

    sort(){
        if(this.searchQuert.sort) {
            const sortBy = this.searchQuert.sort.split(',').join(' ')
            this.mongooseQuery.sort(sortBy)
        }
        return this

    }

}
