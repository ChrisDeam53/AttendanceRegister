//Mongoose ver.
module.exports = mongoose => {
    var Attendance = mongoose.model(
        "Attendance",
        mongoose.Schema({
            attendanceValue: {
                type: Number,
                required: true,
                default: 0 //0 for not attended, 1 for attended, 2 for excused absence, 3 for late
            },
            student: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Student"
            }
        })
    );
    return Attendance;
};