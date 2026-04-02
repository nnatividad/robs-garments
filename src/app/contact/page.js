import styles from './page.module.css'

export default function Contact(){
    return(
        <div className={styles.pageFormat}>
            <div className={styles.information}>
                <h1>Contact</h1>
                <p>For order issues or inquiries, please reach out to us via Instagram DM @robinsgarments with your order number and a brief description of the issue. We'll get back to you as soon as possible.</p>
                <h1>Shipping & Return Policy</h1>
                <h2>Order Processing & Shipping</h2>
                <p>
                    All orders are processed and shipped within 3–5 business days of purchase. Once your order ships, you'll receive a confirmation email with tracking information. Delivery times vary based on location and carrier availability.
                    Please review your order carefully before completing checkout. Robin's Garments is not responsible for errors in size, shipping address, or order details submitted by the customer after an order has been processed.
                </p>
                <h2>Returns & Exchanges</h2>
                <p>
                    Eligible reasons for a return include receiving the wrong item, wrong size, or a damaged product.
                    To qualify, items must be unworn, unused, and returned in original packaging with all tags attached. All claims must be submitted within 7 days of delivery. To initiate a claim, please contact us via Instagram DM at @robinsgarments with your order number and photos of the issue.
                </p>
                <h2>Final Sale</h2>
                <p>
                    All sales are final unless otherwise noted. No exceptions will be made outside of the conditions outlined above.
                </p>
            </div>
        </div>
    );
}