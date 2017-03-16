@router.routed
class Schedule extends ViewModel {
    view() { return ScheduleView; }

    mustachejs: string = '';

    trains: any[] = [
        { stagecolor: 'red', max: 10, now: 9, name: 'sapsan', details: 'noone' },
        { stagecolor: 'green', max: 10, now: 2, name: 'clare', details: 'yep' }
    ];

    autoupdate() { return false; }
}


//<div class="collapsible-header" > <span class="new badge {{stagecolor}}" data- badge - caption="of {{max}}" > {{now }}</span><i class="material-icons">place</i> {{name }}</div>
//    < div class="collapsible-body" > <p>{{details }}</p></div>