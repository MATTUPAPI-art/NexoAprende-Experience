import { Injectable } from '@angular/core';
import { ACTIVITIES } from '../constants/demo-data';
import { Area } from '../models/models';

@Injectable({ providedIn: 'root' })
export class ActivityService {
  readonly activities = ACTIVITIES;
  find(id: Area) {
    return this.activities.find((activity) => activity.id === id);
  }
}
