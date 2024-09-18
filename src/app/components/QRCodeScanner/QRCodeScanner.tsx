'use client'
import React, { useEffect, useRef, useState } from 'react';
import {BrowserMultiFormatReader, NotFoundException, Result} from '@zxing/library';

const QRCodeScanner: React.FC = () => {
    const [hasPermission, setHasPermission] = useState<boolean>(false);
    const [result, setResult] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const codeReader = new BrowserMultiFormatReader();

    const initScanner = async () => {
        try {
            const devices = await codeReader.listVideoInputDevices();
            if (devices.length === 0) {
                console.error('Нет доступных устройств камеры.');
                return;
            }

            // Запрашиваем доступ к камере
            setHasPermission(true);

            // Выбираем первое устройство
            const selectedDeviceId = devices[0].deviceId;
            console.log('Выбранное устройство:', selectedDeviceId);

            // Запускаем сканирование
            await codeReader.decodeFromVideoDevice(selectedDeviceId, videoRef.current!, (result, error) => {
                if (result) {
                    console.log('QR-код найден:', result.getText());
                    setResult(result.getText());
                    codeReader.reset();
                }
                if (error) {
                    console.error('Ошибка считывания QR-кода:', error);
                    // setHasPermission(false);
                    // codeReader.reset();
                }
            });
        } catch (error) {
            console.error('Ошибка:', error);
            codeReader.reset();
        }
    };

    useEffect(() => {
        // initScanner();

        return () => {
            // Остановите сканирование при размонтировании компонента
            codeReader.reset();
        };
    }, [codeReader]);

    useEffect(() => {
        console.log(result)
    }, [result])

    return (
        <div style={{
            maxWidth: '500px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            {
                (!hasPermission || result) && <button onClick={() => {
                    codeReader.reset();
                    setResult(null)
                    initScanner()
                }}>Scan QR</button>
            }
            {
                !result && <video ref={videoRef} style={{width: '100%'}}/>
            }
            {/*<button onClick={initScanner}>Scan QR</button>*/}
            {/*<video ref={videoRef} style={{width: '100%'}}/>*/}
            <div>
                {
                    hasPermission && (
                        result ? (
                            <p>QR-код найден: {result}</p>
                        ) : (
                            <p>Сканирование QR-кода...</p>
                        )
                    )
                }
            </div>
        </div>
    );
};

export default QRCodeScanner;