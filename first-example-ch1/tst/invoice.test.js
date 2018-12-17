import { Invoice } from '../src/invoice';
import { PlayManager } from '../src/play/play_manager';

test('getCustomer gives you customer', () => {
    const customer = "aCustomer";
    const sut = new Invoice(customer, [], new PlayManager({}));
    expect(sut.getCustomer()).toEqual(customer);
});