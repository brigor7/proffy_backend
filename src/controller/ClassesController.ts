import { Request, Response, request } from 'express';
import db from '../database/connection';
import convertHourToMinutes from '../Utils/ConvertHoursToMinutes';

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export default class ClassController {
  async create(request: Request, response: Response) {
    const {
      name,
      avatar,
      wathsapp,
      bio,
      subject,
      cost,
      schedule,
    } = request.body;
    const transaction = await db.transaction();

    try {
      const insertedUsersIds = await transaction('users').insert({
        name,
        avatar,
        wathsapp,
        bio,
      });

      const user_id = insertedUsersIds[0];
      const insertedClassesIds = await transaction('classes').insert({
        subject,
        cost,
        user_id,
      });

      const class_id = insertedClassesIds[0];
      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          class_id,
          week_day: scheduleItem.week_day,
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to),
        };
      });
      await transaction('class_schedule').insert(classSchedule);
      await transaction.commit;
      return response.status(201).send();
    } catch (error) {
      await transaction.rollback();
      console.error(error);
      return response
        .status(400)
        .send({ error: 'Unexpected erro while db transaction.' });
    }
  }
}
