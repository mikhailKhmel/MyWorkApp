using NotesApp.Models;
using System.Linq;

namespace NotesApp.Utils
{
    public static class Utils
    {
        public static bool CompareArrays(List<CompareModel> array1, List<CompareModel> array2)
        {
            var ids1 = array1.Select((obj) => obj.Id);
            var ids2 = array2.Select((obj) => obj.Id);

            // Сравниваем объекты, которые есть в первом массиве и отсутствуют во втором
            var diff1 = array1.Where((obj) => !ids2.Contains(obj.Id));

            // Сравниваем объекты, которые есть во втором массиве и отсутствуют в первом
            var diff2 = array2.Where((obj) => !ids1.Contains(obj.Id));

            // Сравниваем объекты, которые есть в обоих массивах, но lastUpdate разный
            var commonObjs = array1.Where((obj1) =>
                array2.Any((obj2) => obj2.Id == obj1.Id && obj2.LastSync != obj1.LastSync)
            );

            return diff1.Any() || diff2.Any() || commonObjs.Any();
        }
    }
}
