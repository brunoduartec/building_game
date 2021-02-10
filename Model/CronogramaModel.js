class ScheduleModel{
    constructor(){
        this.schedule = {}
    }

    addActivity(activityName, day, start, end){
        if(!this.schedule[day]){
            this.schedule[day] = []
        }

        let activityInfo = {
            name: activityName,
            startAt: start,
            endsIn: end
        }

        this.schedule[day].push(activityInfo);
    }

    getActivityNow(){
        
    }

    getFullchedule(){
        return this.schedule
    }
}