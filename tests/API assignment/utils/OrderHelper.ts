export class OrderIdHelper {
    private static orderId: string;

    static store(id: string): void {
        console.log('Storing Order ID:', id);
        this.orderId = id;
    }

    static get(): string {
        console.log('Retrieving Order ID:', this.orderId);

        if (!this.orderId) {
            throw new Error('Order ID has not been stored yet');
        }

        return this.orderId;
    }
}