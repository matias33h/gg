export interface Category {
    id?:         string;
    name:        string;
    description: string;
    image:       string;
    email:       string;
    phone:       string;
    refPoint:    string;
    lat:         number;
    lng?:         number;
    id_user:     string;
}