import { ObjectId, Timestamp } from "mongodb";

export type User = {
    _id: { type: ObjectId; required: true };
    userType: { type: String; required: true };
    hospitalId: ObjectId;
    entityId: ObjectId;
    emails: [
        {
            address: String;
            isVerified: Boolean;
            isDeleted: Boolean;
            isPrimary: Boolean;
            deletedAt: Timestamp;
        },
    ];
    username: { type: String; required: true };
    password: { type: String; required: true };
    isDeleted: Boolean;
    deletedAt: Timestamp;
};
