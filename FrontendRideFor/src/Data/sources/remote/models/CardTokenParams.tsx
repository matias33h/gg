

export interface CardTokenParams {
    card_number: string;
    expiration_year: string;
    expiration_month: number;
    security_code: string;
    cardholder: Cardholder;
}

export interface Cardholder {
    identification: Identification;
    name: string;
}

export interface Identification {
    number: string;
    type: string;

}