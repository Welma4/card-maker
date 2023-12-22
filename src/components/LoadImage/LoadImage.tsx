import styles from './LoadImage.module.css'

export default function LoadImage() {
    return (
        <div className={styles.fileinput}>
            <label className="file-upload">
            </label>
            <input className={styles.upload} type="file" id="file-upload" />
        </div>
    )
}