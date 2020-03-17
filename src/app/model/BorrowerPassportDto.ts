import { InvestorPassportDto } from './InvestorPassportDto';

export class BorrowerPassportDto extends InvestorPassportDto {
    region: string;
    district: string;
    postalCode: string;
    settlement: string;
    street: string;
    number: string;
    corpsNo: string;
    door: string;
}
