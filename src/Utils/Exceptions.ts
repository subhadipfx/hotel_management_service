export class UserNotFoundException extends Error {
    constructor() {
        super();
        this.message = "No user found with this details";
    }
}

export class InvalidCredentialsException extends Error {
    constructor() {
        super();
        this.message = "Invalid Email or password provided";
    }
}

export class UserAlreadyExistsException extends Error{
    constructor() {
        super();
        this.message = "A user is already registered using the same email";
    }
}

export class ServiceNotFoundException extends Error {
    constructor() {
        super();
        this.message = "Requested service is not found";
    }
}

export class BookingNotFoundException extends Error {
    constructor() {
        super();
        this.message = "No booking found with this ID"
    }
}

export class InvalidBookingStatusException extends Error {
    constructor() {
        super();
        this.message = "Invalid Booking status received";
    }
}

export class AlreadyRatedBookingStatusException extends Error {
    constructor() {
        super();
        this.message = "This booking has been already rated, You cannot update it further";
    }
}


export class NotCheckedOutException extends Error{
    constructor() {
        super();
        this.message = "Bookings need to be checked out for accept ratings";
    }
}
