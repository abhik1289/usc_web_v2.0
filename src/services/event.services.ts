import { db } from "@/lib/db/db";

export async function updateEventDetails({ eventId, updatedData, previousData }: {
    eventId: string,
    updatedData: any,
    previousData: any
}) {
    const {
        titleStr,
        descriptionStr,
        locationStr,
        eventTypeStr,
        isPublic,
        socialMediaStr,
        id,
        indexStr,
        startDateStr,
        startTimeStr,
        endTimeStr,
        startDate1Str,
        startDate2Str,
        startTime1Str,
        endTime1Str,
        startTime2Str,
        endTime2Str,
        startDateOStr,
        endDateOStr
    } = updatedData;

    // Update the main event details
    const event = await db.event.update({
        where: { id: eventId },
        data: {
            title: titleStr,
            description: descriptionStr,
            location: locationStr,
            eventType: eventTypeStr,
            displayType: isPublic === "true" ? "PUBLIC" : "PRIVATE",
            socialMedia: socialMediaStr,
            userId: id,
            index: indexStr,
        },
    });
    let dateData = {
        startDateStr,
        startTimeStr,
        endTimeStr,
        startDate1Str,
        startDate2Str,
        startTime1Str,
        endTime1Str,
        startTime2Str,
        endTime2Str,
        startDateOStr,
        endDateOStr,
    }
    // Handle event type transitions
    await handleEventTypeTransition({ previousData, event, eventTypeStr, dateData });
}

async function handleEventTypeTransition({ previousData, event, eventTypeStr, dateData }: {
    previousData: any,
    event: any,
    eventTypeStr: string,
    dateData: any
}) {
    const {
        startDateStr,
        startTimeStr,
        endTimeStr,
        startDate1Str,
        startDate2Str,
        startTime1Str,
        endTime1Str,
        startTime2Str,
        endTime2Str,
        startDateOStr,
        endDateOStr,
    } = dateData;

    // If event type hasn't changed, update the same type
    if (previousData?.eventType === eventTypeStr) {
        switch (eventTypeStr) {
            case "SINGLE":
                await db.eventDateSingle.update({
                    where: { eventId: event.id },
                    data: {
                        startDate: new Date(startDateStr),
                        startTime: startTimeStr,
                        endTime: endTimeStr,
                    },
                });
                break;

            case "MULTIPLE":
                await db.eventDateMultitle.update({
                    where: { eventId: event.id },
                    data: {
                        startDate1: new Date(startDate1Str),
                        startDate2: new Date(startDate2Str),
                        startTime1: startTime1Str,
                        endTime1: endTime1Str,
                        startTime2: startTime2Str,
                        endTime2: endTime2Str,
                    },
                });
                break;

            case "ONLINE":
                await db.eventVirtual.update({
                    where: { eventId: event.id },
                    data: {
                        startDate: new Date(startDateOStr),
                        endDate: new Date(endDateOStr),
                    },
                });
                break;

            default:
                throw new Error("Unsupported event type");
        }
    } else {
        // Handle event type changes
        await transitionEventType({ fromType: previousData.eventType, toType: eventTypeStr, eventId: event.id, dateData });
    }
}

async function transitionEventType({ fromType, toType, eventId, dateData }: {
    fromType: string,
    toType: string,
    eventId: string,
    dateData: any
}) {
    const {
        startDateStr,
        startTimeStr,
        endTimeStr,
        startDate1Str,
        startDate2Str,
        startTime1Str,
        endTime1Str,
        startTime2Str,
        endTime2Str,
        startDateOStr,
        endDateOStr,
    } = dateData;

    // Delete old event type data
    switch (fromType) {
        case "SINGLE":
            await db.eventDateSingle.delete({ where: { eventId } });
            break;
        case "MULTIPLE":
            await db.eventDateMultitle.delete({ where: { eventId } });
            break;
        case "ONLINE":
            await db.eventVirtual.delete({ where: { eventId } });
            break;
    }

    // Create new event type data
    switch (toType) {
        case "SINGLE":
            await db.eventDateSingle.create({
                data: {
                    eventId,
                    startDate: new Date(startDateStr),
                    startTime: startTimeStr,
                    endTime: endTimeStr,
                },
            });
            break;

        case "MULTIPLE":
            await db.eventDateMultitle.create({
                data: {
                    eventId,
                    startDate1: new Date(startDate1Str),
                    startDate2: new Date(startDate2Str),
                    startTime1: startTime1Str,
                    endTime1: endTime1Str,
                    startTime2: startTime2Str,
                    endTime2: endTime2Str,
                },
            });
            break;

        case "ONLINE":
            await db.eventVirtual.create({
                data: {
                    eventId,
                    startDate: new Date(startDateOStr),
                    endDate: new Date(endDateOStr),
                },
            });
            break;

        default:
            throw new Error("Unsupported event type");
    }
}
