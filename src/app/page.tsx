import Image from "next/image";
import styles from "./page.module.css";
import QRCodeScanner from "@/app/components/QRCodeScanner/QRCodeScanner";

export default function Home() {
  return (
    <div className={styles.page}>
        <main className={styles.main}>
            <h2>QR-код Сканер</h2>
            <QRCodeScanner/>
        </main>

    </div>
  );
}
