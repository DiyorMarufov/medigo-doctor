import { memo, useState, type ChangeEvent, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUplaodFile } from "../services/useUploadFile";
import { Eye, Trash2, FileText } from "lucide-react";

const UplaodFile = () => {
  const { state } = useLocation();
  const [files, setFiles] = useState<Record<string, File | null>>({
    passport_file: null,
    diplom_file: null,
    yatt_file: null,
    sertifikat_file: null,
    tibiy_varaqa_file: null,
  });

  const { uploadFile } = useUplaodFile();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files: inputFiles, name } = e.target;
    if (inputFiles && inputFiles[0]) {
      setFiles((prev) => ({ ...prev, [name]: inputFiles[0] }));
    }
  };

  const handleDelete = (name: string) => {
    setFiles((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("doctor_id", state);
    Object.entries(files).forEach(([key, file]) => {
      if (file) {
        formData.append(key, file);
      }
    });

    uploadFile.mutate(formData, {
      onSuccess: () => {
        navigate("/pending");
      },
    });
  };

  const labels: Record<string, string> = {
    passport_file: "Passport fotosurati (oldi va orqasi)",
    diplom_file: "Diplom (Bakalavr va mutaxassislik)",
    yatt_file: "O‘z-o‘zini band qilish",
    sertifikat_file: "Sertifikat",
    tibiy_varaqa_file: "Shaxsiy tibbiy varaqa",
  };

  return (
    <div className="container min-h-screen bg-white flex flex-col justify-center">
      {/* Header */}
      <div className="flex items-center px-4 py-3 border-b">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mr-2 text-xl"
        >
          ←
        </button>
        <h2 className="text-lg font-medium">Shaxsiy ma’lumotlar</h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 px-4 mt-4">
        {Object.keys(files).map((name) => (
          <div
            key={name}
            className="w-full p-4 bg-gray-100 rounded-xl flex justify-between items-center"
          >
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-700">{labels[name]}</span>

              {!files[name] ? (
                <label className="text-blue-600 text-sm font-medium cursor-pointer ml-90">
                  📤 Fayl yuklash
                  <input
                    type="file"
                    name={name}
                    onChange={handleChange}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="flex items-center gap-2 text-sm text-gray-800">
                  <FileText size={16} className="text-blue-500" />
                  <span className="truncate max-w-[120px]">
                    {files[name]?.name}
                  </span>
                </div>
              )}
            </div>

            {files[name] && (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    window.open(URL.createObjectURL(files[name] as File))
                  }
                  className="text-blue-600"
                >
                  <Eye size={18} />
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(name)}
                  className="text-red-500"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="mt-6 bg-blue-600 text-white py-3 rounded-xl font-semibold"
        >
          Yuborish
        </button>
      </form>
    </div>
  );
};

export default memo(UplaodFile);
