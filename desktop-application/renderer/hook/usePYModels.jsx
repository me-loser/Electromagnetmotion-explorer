import { useNotification } from "./useNotification";

const usePYModels = () => {
  const { NotificationHandler } = useNotification();

  const generateImage = async (dataset) => {
    if (dataset.length == 0) {
      dataset = [
        {
          angle: 4.85,
          timeInMillisec: 10,
        },
      ];
    }
    try {
      const response = await fetch(`http://localhost:8501/generateimage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dataset: dataset,
        }),
      });
      const data = await response.json();
      if (data.status == data.status) {
        NotificationHandler(data.title, data.message, data.status);
      }
      return data.image_url;
    } catch (error) {
      console.log(error.message);
      NotificationHandler("Error", "Predictions failed to work.", "Error");
      const data = [
        "actual_vs_predicted_2023-11-10-01-56-49.png",
        "mean_squared_error_2023-11-10-01-56-49.png",
        "residuals_2023-11-10-01-56-49.png",
      ];
      return data;
    }
  };
  return { generateImage };
};
export default usePYModels;
